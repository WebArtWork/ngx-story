import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StorybossService } from '../../services/storyboss.service';
import { Storyboss } from '../../interfaces/storyboss.interface';

@Component({
	selector: 'storyboss-selector',
	templateUrl: './storyboss-selector.component.html',
	styleUrls: ['./storyboss-selector.component.scss'],
	imports: [SelectModule],
})
export class StorybossSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storyboss[] {
		return this._storybossService.storybosss;
	}

	constructor(private _storybossService: StorybossService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
