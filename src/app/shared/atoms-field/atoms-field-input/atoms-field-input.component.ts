import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'atoms-field-input',
  templateUrl: './atoms-field-input.component.html',
  styleUrls: ['./atoms-field-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomsFieldInputComponent),
      multi: true
    }
  ]
})
export class AtomsFieldInputComponent {

  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() name: string = "";
  @Input() identification: string = "";
  @Input() formControlName: string = "";

  value: any = "";

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Aquí puedes manejar el estado de deshabilitado del input
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
