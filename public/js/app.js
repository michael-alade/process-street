var wisitiaApp = angular.module("wistia", ['blueimp.fileupload']);

wisitiaApp.constant('wistiaConfig', {
    uploadUrl: "https://upload.wistia.com",
    mediaUrl: "https://api.wistia.com/v1/medias.json",
    apiPassword: "9a96b9dab5613b58f51b4268f05cd4d1e8a16387db6622bc6c297ef0fec12a58",
    projectId: "ehru1fmvkr"
})

wisitiaApp.component('wistiaUpload', {
    transclude: true,
    templateUrl: "wistia-upload.html",
    controller: function ($scope, $element, $http, $timeout, wistiaConfig) {
        var ctrl = this;
        ctrl.progressBarVisible = false;
        ctrl.videoReady = false;
        ctrl.videoProcessing = false;
        ctrl.error = false;

        ctrl.options = {
            acceptFileTypes: /(mp4)|(mov)|(flv)$/i,
            url: [
                wistiaConfig.uploadUrl,
                "?api_password=" + wistiaConfig.apiPassword,
                "&project_id=" + wistiaConfig.projectId
            ].join(''),
            formData: function (form) {
                return form.serializeArray();
            },
            add: function (e, data) {
                ctrl.videoReady = false;
                ctrl.videoProcessing = false;
                ctrl.error = false;
                if (!ctrl.options.acceptFileTypes.test(data.files[0].name)) {
                    ctrl.error = true;
                    return ctrl.errorMessage = "You can only upload video files.";
                }
                ctrl.videoReady = false;
                ctrl.videoProcessing = false;
                ctrl.progressBarVisible = true
                ctrl.fail = false;
                return data.submit();
            },
            done: function (e, data) {
                ctrl.videoHash = data.result.hashed_id;
                return ctrl.getMedia($http, $timeout, data.result.hashed_id);
            },
            fail: function (e, data) {
                ctrl.fail = true;
                ctrl.error = true;
                ctrl.errorMessage = data.result.error;
                return;
            },
            progress: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                ctrl.progress = progress;
            }
        }

        ctrl.getMedia = function ($http, $timeout, videoId) {
            ctrl.videoProcessing = true;
            $http.get(wistiaConfig.mediaUrl, {
               params: {
                    api_password: wistiaConfig.apiPassword,
                    hashed_id: videoId
               }
            }).then(function (res) {
                // check if the video is available
                if (res.data) {
                    ctrl.videoStatus = res.data[0].status;
                    // check if the video is ready after processing
                    if (res.data[0].status !== "ready") {
                        return $timeout(function () {
                            // recursively check for media
                            ctrl.getMedia($http, $timeout, videoId)
                        }, 3000);
                    }
                    ctrl.videoProcessing = false;
                    ctrl.videoReady = true;
                    return window.Wistia.embed(videoId);
                }
            }, function (err) {
                ctrl.error = true;
                ctrl.errorMessage = "Something went wrong.";
                return;
            });
        }
    },
});
