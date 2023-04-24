import { capitalize } from "lodash";
import { CategoryType } from "../../../../api/graphql/api.schema";

export const formatCategoryLabel = (category: CategoryType) => {
  const labelArray = category.replace("_", " ").split(" ");
  return labelArray.length > 1
    ? `${capitalize(labelArray[0])} ${labelArray[1].toLowerCase()}`
    : capitalize(labelArray[0]);
};
