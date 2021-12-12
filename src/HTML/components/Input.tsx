import {Component} from "@viYou/render/component";
import {createElement} from "@viYou/render/vdom";

interface IProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    onKeyup?: (event: KeyboardEvent) => void;
}

class Input extends Component<IProps, any> {
    build() {
        return (
            createElement('input', {
                    placeholder: this.props.placeholder || '',
                    className: this.props.className,
                    onkeyup: (e: any) => {
                        if (this.props.onChange) {
                            this.props.onChange((e.target as HTMLInputElement).value);
                        }
                        if(this.props.onKeyup) {
                            this.props.onKeyup(e);
                        }
                    },
                    key: 'text',
                    ...this.props
                },
            )
        )
    }
}

export default Input;