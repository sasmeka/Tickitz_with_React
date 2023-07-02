import React from "react";

function app({ meta, page_active, set_page_active }) {
    return (
        <div className="flex justify-between">
            {
                meta ? (
                    <>
                        {meta.prev ? (
                            <>
                                <button onClick={() => { set_page_active(1) }} className={"bg-white text-[#5F2EEA] w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"} > <i className="fa fa-angle-double-left" aria-hidden="true"></i> </button>
                                <button onClick={() => { set_page_active(meta.prev) }} className={"bg-white text-[#5F2EEA] w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"} > <i className="fa fa-angle-left" aria-hidden="true"></i> </button>
                                <button onClick={() => { set_page_active(meta.prev) }} className={(page_active == meta.prev ? 'bg-[#5F2EEA] text-white' : 'bg-white text-[#5F2EEA]') + " w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"} > {meta.prev} </button>
                            </>
                        ) : ('')}
                        <button onClick={() => { set_page_active(page_active) }} className={"bg-[#5F2EEA] text-white w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"} > {page_active} </button>
                        {meta.next ? (
                            <>
                                <button onClick={() => { set_page_active(meta.next) }} className={(page_active == meta.next ? 'bg-[#5F2EEA] text-white' : 'bg-white text-[#5F2EEA]') + " w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"} > {meta.next} </button>
                                <button onClick={() => { set_page_active(meta.next) }} className={"bg-white text-[#5F2EEA] w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"} > <i className="fa fa-angle-right" aria-hidden="true"></i> </button>
                                <button onClick={() => { set_page_active(meta.last_page) }} className={"bg-white text-[#5F2EEA] w-8 rounded p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] hover:text-white active:bg-[#3604c3] shadow-sm mx-3"} > <i className="fa fa-angle-double-right" aria-hidden="true"></i> </button>
                            </>
                        ) : ('')}
                    </>
                ) : ('')
            }
        </div>
    )
}

export default app