import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";


import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Heading } from "../../../../components/heading";
import { FolderListShimmer } from "../../../../components/loader/FolderDataShimmer";
import { NoData } from "../../../../components/errors/noData";
import DocumentViewer from "../Components";
import { getfolderData } from "../../../../redux/actions/document-action";
import { Button } from "../../../../components/buttons";
import DocumentForm from "../../listing/Components";

const FolderDetail = () => {
    const { isDocumentLoading, listData = [] } = useSelector((state) => state.document);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [openFile, setOpenFile] = useState(false); 
    const [selectedId, setSelectedId] = useState(null);
    const [folderId, setFolderId] = useState(null);
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
    const handleFileModal = (id = null, folderId) => {
        setSelectedId(id); // Set the selected id for file editing
        setOpenFile(!openFile);
        setFolderId(folderId);
      };
   
    return (
        <div>
            <div className="flex items-center justify-between">
                <Heading backButton={true}>Document Detail</Heading>
                <Button
                  primary={true}
                  onClick={handleFileModal}
                >
                  Add Document
                </Button>
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
                                        docName={item?.fileName || `Document ${docIndex + 1}`}
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

<DocumentForm
        open={openFile}
        handleOpen={()=>setOpenFile(false)}
        modalType="file"
        folderId={folderId}
        // id={selectedId}
        // loading={uploadUserDocuments}
      />
        </div>
    );
};

export default FolderDetail;
