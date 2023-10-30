import React from "react"
import Lottie from "lottie-react"

import loadingAnimation from "../../lotties/loading.json"

const Loading = () => (
    <div className="h-screen w-screen flex items-center justify-center">
        <Lottie className="h-52 w-52"  animationData={loadingAnimation} loop={true} />
    </div>
)

export default Loading
