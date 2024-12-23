import { userUserStore } from "@/store/useUserStore";

const Editor = () => {
  const { user } = userUserStore();
  
  console.log(user, "my user");
  
  return (
    <div>Editor</div>
  );
};

export default Editor;