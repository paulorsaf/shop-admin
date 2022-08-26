import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'statusName'})
@Injectable()
export class StatusNamePipe implements PipeTransform {

  transform(value : string | undefined): string {
    if (value === "CREATED") {
      return "Solicitado";
    }
    if (value === "VERIFYING_PAYMENT") {
      return "Verificando pagamento";
    }
    return value || "";
  }

}