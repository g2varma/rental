import LoadingOverlay from "../components/common/Loader";

export default function Loading() {
    return (
        <LoadingOverlay
            loading={true}
        >
            Loading...
        </LoadingOverlay>
    );
}
