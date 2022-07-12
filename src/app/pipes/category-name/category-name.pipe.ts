import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { AppState } from "src/app/store/app-state";

@Pipe({name: 'categoryName'})
@Injectable()
export class CategoryNamePipe implements PipeTransform {

  constructor(
    private store: Store<AppState>
  ) {}

  transform(value : string): Observable<string> {
    return this.store.select(state => state.categories.categories).pipe(
      map(categories => {
        const model = categories.find(b => b.id === value);
        if (model) {
          return model.name;
        }
        return "";
      }),
      tap(console.log)
    );
  }

}