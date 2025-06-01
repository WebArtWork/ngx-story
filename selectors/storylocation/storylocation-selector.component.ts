import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StorylocationService } from '../../services/storylocation.service';
import { Storylocation } from '../../interfaces/storylocation.interface';

@Component({
	selector: 'storylocation-selector',
	templateUrl: './storylocation-selector.component.html',
	styleUrls: ['./storylocation-selector.component.scss'],
	imports: [SelectModule],
})
export class StorylocationSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storylocation[] {
		return this._storylocationService.storylocations;
	}

	constructor(private _storylocationService: StorylocationService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
