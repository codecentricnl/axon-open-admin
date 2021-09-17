import {QuestionCircleOutlined} from "@ant-design/icons";
import {Card, Popover, Space, Typography} from "antd";
import React, {useEffect} from "react";
import ProcessorStatusContainer from "../components/processors/ProcessorStatusContainer";
import {startProcessorFetching, stopProcessorFetching} from "../redux/tokens/fetcher";

export function ProcessorStatusPage() {
    useEffect(() => {
        startProcessorFetching()
        return () => stopProcessorFetching()
    }, [])
    return <Card title={<div>
        <Popover
            placement={"right"}
            style={{float: 'right'}}
            content={
                <Typography.Text>Here you can find the status of the nodes we have discovered through firing rest calls at your back-ends. Don't
                    worry,
                    they
                    are lightning-fast calls with little performance impact. Each time a node is discovered, or is lost, the table is
                    updated.</Typography.Text>}>
            <QuestionCircleOutlined/></Popover> Processor status
    </div>}>
        <Space direction={"vertical"}>
            <ProcessorStatusContainer/>
        </Space>
    </Card>;
}
