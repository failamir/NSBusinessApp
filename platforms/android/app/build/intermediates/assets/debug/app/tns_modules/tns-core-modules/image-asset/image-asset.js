Object.defineProperty(exports, "__esModule", { value: true });
var platform = require("../platform");
var common = require("./image-asset-common");
var file_system_1 = require("../file-system");
global.moduleMerge(common, exports);
var ImageAsset = (function (_super) {
    __extends(ImageAsset, _super);
    function ImageAsset(asset) {
        var _this = _super.call(this) || this;
        var fileName = typeof asset === "string" ? asset.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = file_system_1.path.join(file_system_1.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        _this.android = fileName;
        return _this;
    }
    Object.defineProperty(ImageAsset.prototype, "android", {
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
        },
        enumerable: true,
        configurable: true
    });
    ImageAsset.prototype.getImageAsync = function (callback) {
        var bitmapOptions = new android.graphics.BitmapFactory.Options();
        bitmapOptions.inJustDecodeBounds = true;
        var bitmap = android.graphics.BitmapFactory.decodeFile(this.android, bitmapOptions);
        var sourceSize = {
            width: bitmapOptions.outWidth,
            height: bitmapOptions.outHeight
        };
        var requestedSize = common.getRequestedImageSize(sourceSize, this.options);
        var sampleSize = org.nativescript.widgets.image.Fetcher.calculateInSampleSize(bitmapOptions.outWidth, bitmapOptions.outHeight, requestedSize.width, requestedSize.height);
        var finalBitmapOptions = new android.graphics.BitmapFactory.Options();
        finalBitmapOptions.inSampleSize = sampleSize;
        try {
            var error = null;
            bitmap = android.graphics.BitmapFactory.decodeFile(this.android, finalBitmapOptions);
            if (bitmap) {
                if (requestedSize.width !== bitmap.getWidth() || requestedSize.height !== bitmap.getHeight()) {
                    bitmap = android.graphics.Bitmap.createScaledBitmap(bitmap, requestedSize.width, requestedSize.height, true);
                }
                var rotationAngle = calculateAngleFromFile(this.android);
                if (rotationAngle !== 0) {
                    var matrix = new android.graphics.Matrix();
                    matrix.postRotate(rotationAngle);
                    bitmap = android.graphics.Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
                }
            }
            if (!bitmap) {
                error = "Asset '" + this.android + "' cannot be found.";
            }
            callback(bitmap, error);
        }
        catch (ex) {
            callback(null, ex);
        }
    };
    return ImageAsset;
}(common.ImageAsset));
exports.ImageAsset = ImageAsset;
var calculateAngleFromFile = function (filename) {
    var rotationAngle = 0;
    var ei = new android.media.ExifInterface(filename);
    var orientation = ei.getAttributeInt(android.media.ExifInterface.TAG_ORIENTATION, android.media.ExifInterface.ORIENTATION_NORMAL);
    switch (orientation) {
        case android.media.ExifInterface.ORIENTATION_ROTATE_90:
            rotationAngle = 90;
            break;
        case android.media.ExifInterface.ORIENTATION_ROTATE_180:
            rotationAngle = 180;
            break;
        case android.media.ExifInterface.ORIENTATION_ROTATE_270:
            rotationAngle = 270;
            break;
    }
    return rotationAngle;
};
var calculateInSampleSize = function (imageWidth, imageHeight, reqWidth, reqHeight) {
    var sampleSize = 1;
    var displayWidth = platform.screen.mainScreen.widthDIPs;
    var displayHeigth = platform.screen.mainScreen.heightDIPs;
    reqWidth = (reqWidth > 0 && reqWidth < displayWidth) ? reqWidth : displayWidth;
    reqHeight = (reqHeight > 0 && reqHeight < displayHeigth) ? reqHeight : displayHeigth;
    if (imageWidth > reqWidth && imageHeight > reqHeight) {
        var halfWidth = imageWidth / 2;
        var halfHeight = imageHeight / 2;
        while ((halfWidth / sampleSize) > reqWidth && (halfHeight / sampleSize) > reqHeight) {
            sampleSize *= 2;
        }
    }
    var totalPixels = (imageWidth / sampleSize) * (imageHeight / sampleSize);
    var totalReqPixelsCap = reqWidth * reqHeight * 2;
    while (totalPixels > totalReqPixelsCap) {
        sampleSize *= 2;
        totalPixels = (imageWidth / sampleSize) * (imageHeight / sampleSize);
    }
    return sampleSize;
};
//# sourceMappingURL=image-asset.js.map