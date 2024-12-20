import { Button } from "@/components/ui/button"
import { Github, Globe } from "lucide-react";

const SignUp = () => {
  return (
    <div>
        <div>
            <div>
                <h2>Create an account</h2>
                <p>Enter you email below to create you account</p>
            </div>
            <div>
                <Button>
                    <Github/> GitHub
                </Button>
                <Button>
                    <Globe/> Google
                </Button>
            </div>
        </div>
    </div>
  )
}

export default SignUp