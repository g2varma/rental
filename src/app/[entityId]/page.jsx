import Client from "./Client";
import PropertyDetailsView from "./PropertyDetailsView";
import PropertyList from "./PropertyList";

const EntityPage = ({ params, searchParams }) => {
  const { entityId } = params;
  // if entityid starts with "C" render page for client
  if (entityId.startsWith("C") || entityId.startsWith("c")) {
    return <Client entityId={entityId} searchParams={searchParams} />;
  }
  // if entityid starts with "A" render page for agent
  if (entityId.startsWith("P") || entityId.startsWith("p")) {
    return <PropertyList entityId={entityId} searchParams={searchParams} />;
  }
  // if entityid starts with "P" render page for property
  if (entityId.startsWith("T") || entityId.startsWith("t")) {
    return <PropertyDetailsView entityId={entityId} />;
  }
  return <div>Page not found</div>;
};
export default EntityPage;
