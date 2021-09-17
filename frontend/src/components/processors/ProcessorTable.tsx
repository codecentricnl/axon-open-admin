import {Badge, Popover, Space, Table, Tag} from "antd";
import React from "react";
import {NodeInformation} from "../../redux/tokens/models";

function ProcessorTable({rows, processors}: { rows: NodeInformation[], processors: string[] }) {
    const now = new Date().getTime();
    return (
        <Table dataSource={rows} pagination={{pageSize: 20}}  tableLayout={"fixed"}>
            <Table.Column title="Node" key="nodeId" dataIndex="nodeId"/>
            <Table.Column title="Last seen" key="lastSeen" render={(row: NodeInformation) => {
                const secondsSince = Math.floor((now - row.lastSeen) / 1000)
                return <Tag color={secondsSince > 30 ? 'orange' : 'default'}>{secondsSince} seconds</Tag>
            }}/>

            {processors.map(p => {
                return <Table.Column title={p} key={p} render={(row: NodeInformation) => {
                    const processor = row?.processorStates?.find((ps) => ps.name === p)

                    if (!processor) {
                        return <Tag color={"red"}>Missing</Tag>
                    }
                    if (processor?.error) {
                        return <Tag color={"red"}>Error</Tag>
                    }
                    let available = processor.availableProcessorThreads ?? 0;
                    let active = processor.activeProcessorThreads ?? 0;
                    const total = active + available
                    return <Space>
                        <Popover content={"Active threads of the threads available on this node"}>
                            <Tag color={available > 0 ? "green" : "orange"}>{processor.activeProcessorThreads} / {total}</Tag>
                        </Popover>
                        <Popover content={"Configured batch size of this processor"}>
                        <Tag color={"cyan"}>Batch size: {processor.batchSize}</Tag>
                        </Popover>
                    </Space>
                }}/>
            })}
        </Table>
    );
}


export default ProcessorTable;
