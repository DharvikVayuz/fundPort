import React, { useEffect } from "react";
import { Heading } from "../../../components/heading";
import { useDispatch, useSelector } from "react-redux";
import { FolderListShimmer } from "../../../components/loader/FolderDataShimmer";
import { NoData } from "../../../components/errors/noData";
import DocumentViewer from "./Components";
import { getfolderData } from "../../../redux/actions/document-action";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const DocumentDetail = () => {
    const { isDocumentLoading, listData = [] } = useSelector((state) => state.document);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const searchValue = queryParams.get("search") || searchParams.get("search"); 

    useEffect(() => {
        if (id) {
            dispatch(getfolderData({ id, query: searchValue || "" }));
        }
    }, [dispatch, id, searchValue]); 

    if (isDocumentLoading) {
        return <FolderListShimmer />;
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <Heading backButton={true}>Document Detail</Heading>
            </div>


            {listData?.[0]?.value?.[0]?.length> 0 ? (
                listData.map((item, index) => {
                    if (item?.value && Array.isArray(item.value)) {
                        return item.value.map((docValue, docIndex) => (
                            <React.Fragment key={`${index}-${docIndex}`}>
                               
                                {docValue?.length > 0 ? (
                                    <DocumentViewer
                                        key={`${index}-${docIndex}`}
                                        docUrl={docValue}
                                        docName={item?.lebel || `Document ${docIndex + 1}`}
                                    />
                                ) : (
                                    <NoData key={`no-data-${docIndex}`} />
                                )}
                            </React.Fragment>
                        ));
                    } else {
                        return <NoData key={`no-data-${index}`} />;
                    }
                })
            ) : (
             
                <NoData />
            )}
        </div>
    );
};

export default DocumentDetail;
