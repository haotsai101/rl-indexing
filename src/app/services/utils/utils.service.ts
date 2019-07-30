import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Overlay, ComponentType } from '@angular/cdk/overlay';

import { LoaderComponent } from '../../loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private dialog: MatDialog, private overlay: Overlay, private snackBar: MatSnackBar) { }

  /**
   * Displays a loading spinner (as an overlay) with an optional message.
   * @param message 
   * @param autoclose 
   * @param duration 
   */
  displayLoader(message?: string, autoclose = true, duration = 2000): MatDialogRef<LoaderComponent, any> {
    let dialogRef = this.dialog.open(LoaderComponent, {
      data: { message: message },
      minHeight: '80px',
      minWidth: '250px',
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    if(autoclose) {
      setTimeout(() => {
        dialogRef.close();
      }, duration)
    } else {
      return dialogRef; 
    }
  }

  /**
   * Displays the given modal component, and injects the data.
   * @param component 
   * @param data 
   * @param width 
   * @param height 
   */
  displayModal(component: ComponentType<any>, data: any, width = '600px', height = 'auto'): MatDialogRef<ComponentType<any>, any> {
    let dialogRef = this.dialog.open(component, {
      data: data,
      width: width,
      height: height,
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    return dialogRef;
  }

  /**
   * Displays a material snackbar with message and button
   * @param message 
   * @param buttonText 
   */
  displaySnack(message: string, buttonText: string) {
    let snackBarRef = this.snackBar.open(message, buttonText);

    setTimeout(() => {
      if (!!snackBarRef) {
        snackBarRef.dismiss();
      }
    }, 6000);
  }

  /**
   * Takes a string and hashes in into a hex color.
   * @param str
   */
  stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  // from stackoverflow https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  shadeColor(color, percent) {
    let f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  /**
   * Takes a string and converts it to a color (a hash such that all events of a given name will return the same color).
   * The resulting color is then converted into an object representing the state and color of a material design checkbox,
   * e.g. primary and secondary colors, and whether the checkbox is active or not (set to true for all).
   * @param str 
   */
  stringToColors(str) {
    let color = this.stringToColor(str);
    return {
      primary: color,
      secondary: this.shadeColor(color, 0.5),
      active: true
    }
  }

  /**
   * FamilySearch events have date strings with (potentally), a start date, end date,
   * and year. If the data is in a recognizable format, it will parse the dates and return them. 
   * @param date 
   */
  parseDates(date: string): [Date, Date, string] {
    if(!!date && Number.isInteger(parseInt(date[0])) && date.split('/')[0].length > 4) { 
      let dates = date.split('/');

      let year = dates[0].split(' ').pop();
      return [new Date(dates[0]), new Date(dates[1]), year];
    } else {
      return [undefined, undefined, undefined];
    }
  }

  /**
   * Parses the event type from the fs info
   * @param type the event type
   */
  parseType(type: string) {
    return decodeURIComponent(type.split('/').pop().toLowerCase()).replace('data:,', '');
  }

}
