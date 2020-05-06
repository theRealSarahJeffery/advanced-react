import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import signup, { SIGNUP_MUTATION } from '../components/Signup';
import { fakeUser } from '../lib/testUtils';
import Signup from '../components/Signup';


function type (wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value },
  });
}

const me = fakeUser();
const mocks = [
  {
    //signup mock mutation
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: '1234',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abs123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  //current user query mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: { me }
    },
  },
];

describe('<Signup/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    type(wrapper, 'name', me.name);
    type(wrapper, 'email', me.email);
    type(wrapper, 'password', '1234');
    wrapper.update();
    wrapper.find('form').simulate('submit');
    await wait();
    // query the user out of the apollo client
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  });
})

