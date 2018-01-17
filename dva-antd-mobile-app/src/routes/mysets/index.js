import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Sets from './sets';
import Nav from 'components/Layout/nav'
import styles from './index.less';

function Mysets({location, mysets, loading, dispatch, app}) {
    const PrefixCls = "mysets",
        {user, userData} = app,
        {query : {title = ""}} = location,

        uploadSuccess = (newPath) => {
            dispatch({
                type: "app/updateState",
                payload: {
                    userData,
                    user: {
                        ...user,
                        userPic: newPath
                    }
                }
            })
        };

    return (
        <div>
          <Nav dispatch={dispatch} title={title}/>
          <div className={ styles[`${PrefixCls}-normal`] }>
            <Sets userInfo={ { ...userData, ...user } } dispatch={ dispatch } uploadSuccess={ uploadSuccess } />
          </div>
        </div>
        );
}

Mysets.propTypes = {
    location: PropTypes.object.isRequired,
    mylist: PropTypes.object,
    loading: PropTypes.object,
};

export default connect(({mysets, loading, app}) => ({
    mysets,
    loading,
    app
}))(Mysets);
