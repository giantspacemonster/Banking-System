const { GraphQLScalarType, Kind } = require('graphql');

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
      return value;
    },
    parseValue(value) {
      const dateValue = new Date(value);
      return Number.isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        const value = new Date(ast.value);
        return Number.isNaN(value) ? undefined : value;
      }
      return undefined;
    },
  });

  module.exports = GraphQLDate;