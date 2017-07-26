import React, { PropTypes } from 'react'
import {ActionSheetIOS} from 'react-native'


const optionNames = [
	'title',
	'options',
	'tintColor',
	'cancelButtonIndex',
	'destructiveButtonIndex',
	'anchor'
]


function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]'
}


class ActionSheet extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let options = this.props.options
		if (!isArray(options) || options.length === 0) {
			throw Error('Prop `options` must be an array and it must not be empty.')
		}
	}

	show() {
		let props = this.props;
		const newOptions = props.options.map((item, index) => {
			return item[props.labelName];
		} );
    let options = optionNames.reduce((obj, name, index) => {
        if (typeof props[name] !== 'undefined' && props[name] !== null) obj[name] = props[name]
        return obj
    }, {})
		options['options'] = newOptions;
		ActionSheetIOS.showActionSheetWithOptions(options, props.onPress)
	}

	render() {
		return null
	}
}


ActionSheet.propTypes = {
	title: PropTypes.string,
	labelName: PropTypes.string,
	options: PropTypes.array.isRequired,
	tintColor: PropTypes.string,
	cancelButtonIndex: PropTypes.number,
	destructiveButtonIndex: PropTypes.number,
	onPress: PropTypes.func,
	anchor: PropTypes.object
}

ActionSheet.defaultProps = {
	onPress: () => {},
	labelName: 'label',
}


export default ActionSheet
