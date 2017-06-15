describe("WisitaUpload Component", function () {
    var $componentController, element, scope, ctrl, stubFileData;

    beforeEach(angular.mock.module('wistia'));

    beforeEach(angular.mock.module('wistia-upload.html'));

    beforeEach(inject(function ($rootScope, $compile, _$componentController_, wistiaConfig) {
        stubFileData = {
            files: [
                {
                    lastModified: 1497278286000,
                    name: "Hey there, welcome to Wistia!.flv",
                    size: 10919770,
                    type: "video/x-flv",
                }
            ]
        };
    
        $componentController = _$componentController_;
        scope = $rootScope.$new();
        element = angular.element('<wistia-upload></wistia-upload>');
        element = $compile('<wistia-upload></wistia-upload>')(scope);
        ctrl = $componentController('wistiaUpload', { 
            $scope: scope, 
            $element: element,
        }, {});
        scope.$digest();
    }));

    it("should initialize the component's controller bindings", function () {
        expect(ctrl.progressBarVisible).toBe(false);
        expect(ctrl.videoReady).toBe(false);
        expect(ctrl.videoProcessing).toBe(false);
        expect(ctrl.videoProcessing).toBe(false);
        expect(ctrl.error).toBe(false);
    });

    it("should simulate when the file data is submitted", function () {
        var submit = jasmine.createSpy('submit');
        stubFileData.submit = submit;
        ctrl.options.add({}, stubFileData);
        expect(submit).toHaveBeenCalled();
    });

    it("should simulate done method when the file has been successfully submitted", function () {
        ctrl.getMedia = jasmine.createSpy('getMedia');
        ctrl.options.done({}, {
            result: {
                hashed_id: "8939481nsa"
            }
        });

        expect(ctrl.getMedia).toHaveBeenCalled();
    });

    it("should send an error message when the upload fails", function () {
        var result = {
            error: "Video failed"
        };
        ctrl.options.fail({}, { result: result });
        expect(ctrl.errorMessage).toBe(result.error);
        expect(ctrl.error).toBe(true);
    });

    it("should not allow non video files", function () {
        stubFileData.files[0].name = "uploaded_file.png";
        ctrl.options.add({}, stubFileData)
        expect(ctrl.error).toBe(true);
        expect(ctrl.errorMessage).toBe("You can only upload video files.");
    });
})