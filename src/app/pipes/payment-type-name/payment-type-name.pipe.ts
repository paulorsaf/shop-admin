import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'paymentTypeName'})
@Injectable()
export class PaymentTypeNamePipe implements PipeTransform {

  transform(value : string): string {
    if (value === "PIX") {
      return "Pix";
    }
    if (value === "MONEY") {
      return "Dinheiro";
    }
    return value;
  }

}