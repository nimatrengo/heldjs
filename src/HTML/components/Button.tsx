import {Component} from "@viYou/render/component";
import {createElement, createText} from "@viYou/render/vdom";

interface IProps {
    label: string;
    className?: string,
    [key: string]: string,
}

class Button extends Component<IProps, {}>{
    build(){
        return(
            createElement('button', {
                    className: this.props.className,
                    key: 'text',
                    ...this.props
                },
                createText(this.props.label)
            )
        )
    }
}

export default Button;