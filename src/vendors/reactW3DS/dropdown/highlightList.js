import React from "react";
import PropTypes from "prop-types";
import {getTranslateLanguage} from "../../../util/BaseLanguage";
import {Loading} from "../index";



export default class HighlightMatchingDropdownList extends React.Component {

    render() {
        let optionArray = [];
        if (this.props.showLoadingIcon &&
            this.props.optionList.length <= 0 &&
            this.props.matchingText === '') {
            optionArray.push(
                <div key={0}
                    // tabIndex={optionTypeIndex}
                >
                    <Loading key={0} style={{fontSize: '13px'}} widthExp={'autoWidth'}/>
                </div>
            );
        } else {
            for (let i = 0; i < this.props.optionList.length; i++) {

                let obj = this.props.optionList[i],
                    val = obj[this.props.nameKey] ? obj[this.props.nameKey] + '' : obj.toString() + '',
                    trimmedFilterText = this.props.matchingText.trim(),
                    matchedIndex = val.toLowerCase().indexOf(trimmedFilterText.toLowerCase()),
                    displayText = [],
                    shouldDisplay = matchedIndex >= 0;
                // find ALL the matched substring
                while (matchedIndex >= 0 && matchedIndex < val.length && trimmedFilterText.length > 0) {
                    // normal font
                    displayText.push(
                        <span key={i + displayText.length}>{val.substring(0, matchedIndex)}</span>
                    );
                    // bold fontc
                    displayText.push(
                        <span key={i + displayText.length} className={'ds-font-weight-bold'}>
                            {val.substr(matchedIndex, trimmedFilterText.length)}
                        </span>
                    );
                    // get sub string to find the next matched part
                    val = val.substr(matchedIndex + trimmedFilterText.length);
                    matchedIndex = val.toLowerCase().indexOf(trimmedFilterText.toLowerCase());
                }
                // push the last part into the array
                displayText.push(
                    <span key={i + displayText.length}>{val}</span>
                );

                if (shouldDisplay) {
                    let sel = this,
                        liClassName = this.props.optionItemClassName + ' ds-option ds-values-width optionFontSize';
                    optionArray.push(
                        (function (o) {
                            return (
                                <div key={i}
                                     className={liClassName}
                                     role={'menuitem'}
                                     onClick={(e) => {
                                         sel.props.onOptionClicked(e, i, o);
                                     }}
                                    // tabIndex={optionTypeIndex}
                                >
                                    { displayText }
                                </div>
                            );
                        })(obj)
                    );
                }
            }

            if (optionArray.length <= 0 && !this.props.isLoading) {
                optionArray.push(
                    <div key={9} className='noValueWaring optionFontSize'>
                        {getTranslateLanguage('NoValsWaring')}
                    </div>
                );
            }
        }

        return(
            <div className={this.props.className}>
                {optionArray}
            </div>
        );
    }
}

HighlightMatchingDropdownList.propTypes = {
    onOptionClicked: PropTypes.func, // f(clickEvent, clickedIndex, clickedObj)
    optionList: PropTypes.array, // [{idKey: xxx, nameKey: xxx, ...}]
    matchingText: PropTypes.string, // highlight text
    className: PropTypes.string,
    optionItemClassName: PropTypes.string,
    showLoadingIcon: PropTypes.bool, // determine whether to show an loading icon
    idKey: PropTypes.string, // a key to find the ID in optionList
    nameKey: PropTypes.string, // a key to find the display name in optionList
    isLoading: PropTypes.bool // set loading status... isLoading determines whether display No Result Found
};

HighlightMatchingDropdownList.defaultProps = {
    onOptionClicked: () => {},
    optionList: [],
    matchingText: '',
    className: '',
    optionItemClassName: '',
    showLoadingIcon: false,
    idKey: 'id',
    nameKey: 'name',
    isLoading: false
};
