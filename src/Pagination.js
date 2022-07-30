

export default function Pagination({ gotoPrevPage, gotoNextPage }) {
    return (
        <div>
            {gotoPrevPage && <button onClick={gotoPrevPage}>previous</button>}
            {gotoNextPage && <button onClick={gotoNextPage}>next</button>}
        </div>
    )

}