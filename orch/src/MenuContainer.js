import React, {Component} from "react";
import MenuButton from "./MenuButton.js";
import Menu from "./Menu.js";

class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }
    handleMouseDown(e) {
        this.toggleMenu();
        console.log('clicked');
        e.stopPropagation();
    }
    render() {
        return (
            <div>
            <MenuButton handleMouseDown={this.handleMouseDown} />
            <Menu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible} />
                <div>
                    <h1>Orchestra App</h1>
                </div>
            </div>
        );
    }
}

export default MenuContainer;