import * as Router from '@reach/router'
import {Head, Link, List} from '@shared/components'
import {APP_TITLE} from '@shared/config'
import {View} from '@website/pages/landing/styled'
import {Store} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

interface Props extends Router.RouteComponentProps<{}> {
  store: Store
}

@hot(module)
@inject('store')
@observer
class Landing extends React.Component<Props> {
  private readonly title = APP_TITLE

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.title}</title>
        </Head>

        <View>
          <h1>Webmaster Kit</h1>

          <List horizontal spacing="sm" mt="md">
            {this.isLoggedIn ? this.renderUserNav() : this.renderGuestNav()}
          </List>
        </View>
      </React.Fragment>
    )
  }

  renderUserNav = () => (
    <React.Fragment>
      <Link to="/auth/logout">{this.props.store.t`Sign out`}</Link>

      <a onClick={() => this.props.store.modal.open('profile')}>
        {this.props.store.t`My profile`}
      </a>
    </React.Fragment>
  )

  renderGuestNav = () => (
    <React.Fragment>
      <Link to="/auth/login">{this.props.store.t`Sign in`}</Link>
      <Link to="/auth/register">{this.props.store.t`Create account`}</Link>
    </React.Fragment>
  )

  private get isLoggedIn(): boolean {
    return this.props.store.userStore.isLoggedIn
  }
}

export default Landing
