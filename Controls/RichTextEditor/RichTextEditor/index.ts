import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { CustomEditor, EditorFactory } from "./customeditor";

export class RichTextEditor implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _textarea: HTMLTextAreaElement;
	private _editor: CustomEditor;
	private _value: string;

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Create editor container
		this._container = document.createElement("div");
		this._container.classList.add("rt-container");

		
		/*
		 * Create textarea element for editor.
		 * Assigning attribute logical name will help to create multiple instances of editor on same page
		 */ 
		var attributeLogicalName = context.parameters._html.attributes?.LogicalName ?? "rt-textarea";
		this._textarea = document.createElement("textarea");
		this._textarea.id = attributeLogicalName;
		this._container.appendChild(this._textarea);
		
		// Create custom editor instance.
		this._editor = EditorFactory.CreateCustomEditor(this._textarea, true);
		
		// Add input paramter to editor contents
		this._value = context.parameters._html.raw ?? "";
		this._editor.setContents(this._value);

		// Add editor container to framework container
		container.appendChild(this._container);

		// Update context paramter on content change 
		this._editor.onChange = () =>{
			this._value = this._editor.getContents(true);
			notifyOutputChanged();
		}

		// Disable editor if the control is disabled
		this.enableEditor(!context.mode.isControlDisabled);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			_html: this._value
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Destroy editor instace
		this._editor.destroy();
	}

	
    private enableEditor(enable: boolean): void
	{
		if(enable)
		{
			this._editor.enabled();
		}
		else
		{
			this._editor.disabled();
		}
	}
}