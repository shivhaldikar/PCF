import SunEditor from "suneditor/src/lib/core";
import suneditor from 'suneditor'
import { font, fontColor, fontSize, formatBlock, hiliteColor, 
	textStyle, align, horizontalRule, link, list } from 'suneditor/src/plugins'
import table_8x8 from "./table_8x8";

export class CustomEditor extends SunEditor
{
    onFocus: (e: FocusEvent, core: any) => void;
}

export class EditorFactory 
{
    /**
     * 
     * @param textarea 
     * @param hideShow enable hide and show toolbar on focus grab and leave event
     */
    static CreateCustomEditor(textarea: HTMLTextAreaElement, hideShow: boolean = false) : CustomEditor
    {
       var editor = suneditor.create(textarea, {
			plugins:[font, fontColor, fontSize, 
					 formatBlock, hiliteColor, textStyle,
					 align, horizontalRule, list, link,
					 table_8x8],
			showPathLabel : false,
			charCounter : true,
			font: [
                "Arial",
                "Courier New",
                "Impact",
                "Georgia",
                "tahoma",
                "Trebuchet MS",
				"Verdana",
				"Calibri",
				"Lucida Console",
				"Times New Roman",
				"Helvetica"
			],
			buttonList: [
				['bold', 'underline', 'italic', 'strike', 'outdent', 'indent'],
				['font','fontSize','formatBlock'],
				['fontColor', 'hiliteColor', 'textStyle'],
				['align', 'horizontalRule', 'list'],
				['table','link'], 
        		['fullScreen', 'codeView']
			],
			height: "230"
        }) as CustomEditor;
        
        if(hideShow)
        {
            // Enable hide and show toolbar 
            editor.toolbar.hide();
            editor.onFocus = () => editor.toolbar.show();
            editor.onBlur = () => editor.toolbar.hide();
        }

        return editor;
    }
}