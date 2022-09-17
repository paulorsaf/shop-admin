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
    if (value === "FINISHED") {
      return "Finalizado";
    }
    if (value === "PAID") {
      return "Pago";
    }
    if (value === "SORTING_OUT") {
      return "Empacotando";
    }
    if (value === "READY") {
      return "Pronto";
    }
    if (value === "DELIVERYING") {
      return "Entregando";
    }
    if (value === "CANCELLED") {
      return "Cancelado";
    }
    return value || "";
  }

}