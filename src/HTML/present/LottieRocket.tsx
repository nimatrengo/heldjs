import {Component} from "@viYou/render/component";
import {createElement} from "@viYou/render/vdom";

class LottieRocket extends Component<{}, {}> {

    build() {
        return (
            createElement('div', {
                    key: 'div',
                    className: 'items-end justify-end flex flex-col md:flex-row-reverse'
                },
                createElement('div', {
                        key: 'div',
                        className: 'flex items-start justify-end left-full mb-9 md:my-0 md:w-5/12 ml-auto mr-auto mr-px my-16 px-4 w-full'
                    },
                    createElement('lottie-player', {
                        key: 'logo',
                        className: 'max-w-full rounded-lg',
                        loop: true,
                        autoplay: true,
                        style: "width: 100%; height: 100%;",
                        background: "transparent",
                        speed: "1",
                        src: "https://assets3.lottiefiles.com/packages/lf20_vrtIsn.json"
                    })),
            ))
    }
}

export default LottieRocket;