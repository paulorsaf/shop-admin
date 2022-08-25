import { TestBed } from "@angular/core/testing";
import { StatusNamePipeModule } from "./status-name.module";
import { StatusNamePipe } from "./status-name.pipe"

describe('Status name pipe', () => {

  let pipe: StatusNamePipe;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          StatusNamePipeModule
        ],
        providers: [
          StatusNamePipe
        ]
      })
      .compileComponents();
  
      pipe = TestBed.inject(StatusNamePipe);
  });

  it('given status is CREATED, then return Solicitado', () => {
    expect(pipe.transform("CREATED")).toEqual("Solicitado");
  })

  it('given status is VERIFYING_PAYMENT, then return Verificando pagamento', () => {
    expect(pipe.transform("VERIFYING_PAYMENT")).toEqual("Verificando pagamento");
  })

  it('given status is an unknown status, then return the unknown status', () => {
    expect(pipe.transform("UNKNOWN")).toEqual("UNKNOWN");
  })

})