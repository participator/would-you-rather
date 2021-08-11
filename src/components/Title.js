import './Title.css'

const Title = ({children, className, tag:Tag}) => {
    return (
        <Tag className={`Title ${className}`}>{children}</Tag>
    )
}

export default Title