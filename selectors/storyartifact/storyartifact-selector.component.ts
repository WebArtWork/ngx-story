import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StoryartifactService } from '../../services/storyartifact.service';
import { Storyartifact } from '../../interfaces/storyartifact.interface';

@Component({
	selector: 'storyartifact-selector',
	templateUrl: './storyartifact-selector.component.html',
	styleUrls: ['./storyartifact-selector.component.scss'],
	imports: [SelectModule],
})
export class StoryartifactSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storyartifact[] {
		return this._storyartifactService.storyartifacts;
	}

	constructor(private _storyartifactService: StoryartifactService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
