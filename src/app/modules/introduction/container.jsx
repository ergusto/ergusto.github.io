import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import Component from './component.jsx';

const mapStateToProps = (state, props) => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({
		}, dispatch)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));