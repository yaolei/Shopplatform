import React from 'react';
import './index.less';
import PropTypes from "prop-types";
import OutsideClickHandler from 'react-outside-click-handler';
import { Checkbox } from '../../vendors/reactW3DS'

export default class ColumnList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showColumnList : false
        }
    }

    getOptionList() {
        let columnNames = this.props.columnNames?this.props.columnNames:[];
        let $$itemList = [];

        // first loop to check if there is only one displaying column
        // thus, we should set it disabled to forbid user to hide it
        let displayingCount = 0;
        columnNames.forEach((name,i) => {
            if (!name.isHide) {
                displayingCount ++;
            }
        });

        // second loop to generate components
        columnNames.forEach((name,i) => {
            $$itemList.push(
                <Checkbox isChecked={!name.isHide}
                          key={i}
                          title={name.title}
                          isDisabled={!name.isHide && displayingCount === 1}
                          className={'columnTitle'}
                          onCheckboxClicked={(show, e) => {this.props.hideColumn(name.key, i, !name.isHide)}}/>
            );
        });
        return $$itemList;
    }

    getComponent () {
        let comp;
        if (this.props.showColumnList) {
            comp =
                <OutsideClickHandler onOutsideClick={(e) => {
                    // a bad solution
                    // if the button is clicked, will not trigger the hide function
                    if (e.target.className.indexOf('hideIcon') < 0 &&
                        e.target.className.indexOf('settingIcon') < 0) {
                        this.props.dismissHandler();
                    }
                }}>
                    <div>
                        {this.getOptionList()}
                    </div>
                </OutsideClickHandler>
        } else {
            comp = <div></div>
        }

        return comp
    }

    render() {
        return (
            <div className={this.props.showColumnList ? 'columnNames' : 'hideblock columnNames'}>
                {this.getComponent()}
            </div>
        );
    }
}

ColumnList.propTypes = {
    showColumnList: PropTypes.bool,
    columnNames: PropTypes.array,
    hideColumn: PropTypes.func,
    dismissHandler: PropTypes.func
};

ColumnList.defaultProps = {
    showColumnList: false,
    columnNames: [],
    hideColumn: () => {},
    dismissHandler: () => {}
}
