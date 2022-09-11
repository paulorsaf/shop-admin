import { TestBed } from "@angular/core/testing";
import { PaymentTypeNamePipeModule } from "./payment-type-name.module";
import { PaymentTypeNamePipe } from "./payment-type-name.pipe"

describe('Payment type name pipe', () => {

  let pipe: PaymentTypeNamePipe;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          PaymentTypeNamePipeModule
        ],
        providers: [
          PaymentTypeNamePipe
        ]
      })
      .compileComponents();
  
      pipe = TestBed.inject(PaymentTypeNamePipe);
  });

  it('given payment type is PIX, then return PIX', () => {
    expect(pipe.transform("PIX")).toEqual("Pix");
  })

  it('given payment type is MONEY, then return Dinheiro', () => {
    expect(pipe.transform("MONEY")).toEqual("Dinheiro");
  })

  it('given payment type is CREDIT_CARD, then return Cartão de crédito', () => {
    expect(pipe.transform("CREDIT_CARD")).toEqual("Cartão de crédito");
  })

  it('given payment type is an unknown type, then return the unknown type', () => {
    expect(pipe.transform("UNKNOWN")).toEqual("UNKNOWN");
  })

})