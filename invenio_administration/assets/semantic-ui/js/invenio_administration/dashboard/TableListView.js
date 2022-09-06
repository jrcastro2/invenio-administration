import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { InvenioAdministrationActionsApi } from "../api/actions";
import { Table, Container, Loader, Header, Message } from "semantic-ui-react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _upperFirst from "lodash/upperFirst";

export default class TableListView extends React.Component {
  constructor() {
    super();
    this.state = {
      hits: [],
      isLoading: false,
      sortedFields: {},
    };
  }
  fetchValues = async () => {
    const { apiEndpoint, query, sort, page, size } = this.props;
    return await InvenioAdministrationActionsApi.searchResource(
      apiEndpoint,
      query,
      sort,
      page,
      size
    );
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { fields } = this.props;
    const sortFields = (fields) =>
      Object.entries(fields).sort((a, b) => a[1].order > b[1].order);
    const response = await this.fetchValues();
    const sortedFields = sortFields(fields);
    console.log("sortedFields", sortedFields);
    console.log("fields", fields);
    this.setState({
      hits: response.data.hits.hits,
      isLoading: false,
      sortedFields: sortedFields,
    });
  }

  displayNoHits = () => {
    return <Message>No results found</Message>;
  };

  displayTable = () => {
    const { hits, sortedFields } = this.state;

    return (
      <>
        <Table>
          <Table.Header>
            <Table.Row>
              {sortedFields.map(([property, { text, order }]) => {
                return (
                  <Table.HeaderCell data-testid={`header-${property}`}>
                    {text}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {hits.map((hit) => {
              return (
                <Table.Row>
                  {sortedFields.map(([property, { text, order }]) => {
                    return <Table.Cell>{_get(hit, property)}</Table.Cell>;
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  };

  render() {
    const { isLoading, hits } = this.state;
    const { header } = this.props;

    return (
      <Container>
        <Header>{header}</Header>
        {isLoading ? (
          <Loader active />
        ) : !_isEmpty(hits) ? (
          this.displayTable()
        ) : (
          this.displayNoHits()
        )}
      </Container>
    );
  }
}

TableListView.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  query: PropTypes.string,
  sort: PropTypes.string,
  page: PropTypes.number,
  size: PropTypes.number,
};

TableListView.defaultProps = {
  query: "",
  sort: "newest",
  page: 1,
  size: 5,
};

export function createTableListView(rootElement, props) {
  return ReactDOM.render(<TableListView {...props} />, rootElement);
}
