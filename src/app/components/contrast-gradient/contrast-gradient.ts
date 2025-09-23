import { Component, computed, input } from '@angular/core';

export type ToOptions = 'bottom' | 'top' | 'left' | 'right';

@Component({
  selector: 'app-contrast-gradient',
  imports: [],
  templateUrl: './contrast-gradient.html',
})
export class ContrastGradientComponent {
  to = input<ToOptions>('bottom');
  percentageSize = input.required<string>();

  private getIsVertical() {
    const verticalOptions = ['bottom', 'top'];
    return verticalOptions.includes(this.to());
  }

  class = computed(() => {
    const classToMap = {
      top: 'inset-x-0 bottom-0 bg-gradient-to-t',
      bottom: 'inset-x-0 top-0 bg-gradient-to-b',
      left: 'inset-y-0 right-0 bg-gradient-to-l',
      right: 'inset-y-0 left-0 bg-gradient-to-r',
    };
    return classToMap[this.to()];
  });

  width = computed(() => {
    const isVertical = this.getIsVertical();
    return isVertical ? 100 : this.percentageSize();
  });

  height = computed(() => {
    const isVertical = this.getIsVertical();
    return !isVertical ? 100 : this.percentageSize();
  });
}
