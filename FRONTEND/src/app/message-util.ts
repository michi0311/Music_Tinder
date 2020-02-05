import {ToastController} from '@ionic/angular';

export class MessageUtil {

  public static async showMessage(text: string) {
    const toastController = new ToastController();
    const toast = await toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
