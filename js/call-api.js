'use strict';

// let e = React.createElement;

class CallApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return e('div', null, `Error: ${error.message}`);
    } else if (!isLoaded) {
      return e('div', null, `Loading...`);
    } else {

      let list = [];
      for (const item of items) {
        list.push(e('li', { name: item.id }, `${item.id}: ${item.title}`));
      }

      return e('ul', null, list);
    }
  }
}


ReactDOM.render(
  e(CallApi, {}),
  document.getElementById('call_api')
);
