import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'img[thumbnail]'
})
export class ThumbnailDirective implements OnChanges {
  @Input() public image: any;

  constructor(private el: ElementRef,
    private renderer: Renderer) { }

  public ngOnChanges(changes: SimpleChanges) {

    let reader = new FileReader();
    let el = this.el;

    reader.onloadend = (readerEvent) => {
      let image = new Image();
      image.onload = (imageEvent) => {
        let canvas = document.createElement('canvas');

        // resize and crop image to square
        let size: number;
        let sx = 0, sy = 0; // sx: how much to crop from left, sy: how much to crop from top

        if (image.width > image.height) {
          size = image.height;
          sx = (image.width - image.height) / 2;
          sy = 0;
        } else {
          size = image.width;
          sx = 0;
          sy = (image.height - image.width) / 2;
        }

        canvas.width = 140;   // resize image to 200
        canvas.height = 140;
        canvas.getContext('2d').drawImage(image,
          sx, sy, size, size, // size: keep original scale
          0, 0, 140, 140);

        el.nativeElement.src = canvas.toDataURL('image/jpeg');
      };
      image.src = reader.result.toString();
    };

    if (this.image) {
      return reader.readAsDataURL(this.image);
    }
  }
}