const loading = <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: 420 }}>
    <div className="page-loading-warp">
        <div className="ant-spin ant-spin-lg ant-spin-spinning">
            <span className="ant-spin-dot ant-spin-dot-spin"><i className="ant-spin-dot-item"></i><i
                className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i><i className="ant-spin-dot-item"></i></span>
        </div>
    </div>
</div >

const PageLoading = () => {
    return loading
}
export { PageLoading }

export default () => {
    return loading
}