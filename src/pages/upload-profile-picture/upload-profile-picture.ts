import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ToastProvider} from "../../providers/toast/toast";
import {LoaderProvider} from "../../providers/loader/loader";
import {AccountProvider} from "../../providers/account/account";
import _ from 'lodash';
import {HomePage} from "../home/home";

@IonicPage()
@Component({
    selector: 'page-upload-profile-picture',
    templateUrl: 'upload-profile-picture.html',
})
export class UploadProfilePicturePage {

    previewActivated = false;
    picPreview;
    pictureData;
    canUpload = false

    constructor(public navCtrl: NavController,
                public actionSheetCtrl: ActionSheetController,
                public camera: Camera,
                public toast: ToastProvider,
                public loader: LoaderProvider,
                public accountProvider: AccountProvider) {
    }

    showPictureOptions() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'How would you like to get a picture?',
            buttons: [
                {
                    text: 'Snap with camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                }, {
                    text: 'Choose from gallery',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        actionSheet.present();
    }

    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options: CameraOptions = {
            quality: 50,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.DATA_URL,
            allowEdit: true,
        };

        // Get the data of an image
        this.camera.getPicture(options).then((picture) => {
            this.picPreview = this.pictureData = 'data:image/jpeg;base64,' + picture;
            this.canUpload = this.previewActivated = true;
        }, (err) => {
            console.log(err)
            this.toast.show('Did you select a picture?');
        });
    }

    uploadImage() {
        // console.log(this.pictureData);
        let loader = this.loader.show('Uploading your picture. Please be patient...');
        this.accountProvider.uploadProfilePicture(this.pictureData).then(res => {
            if (_.has(res, 'error')) {
                this.toast.show(res['error']);
            } else {
                this.navCtrl.setRoot(HomePage);
                loader.dismiss();
                this.toast.show('Your picture has been saved!', 6000);
            }
        });
    }


}
