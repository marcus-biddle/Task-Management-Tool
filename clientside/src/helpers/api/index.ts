import { Task } from "../../api/taskApi";
import { User } from "../../api/userApi";

export const getName = (users: User[], id: string): User => { 
    const names = users.filter((user: User) => user._id === id);
    return names[0];
};

const removeDuplicates = <T>(arr: T[]): T[] => {
    return Array.from(new Set(arr));
  };

export const getNamesInServer = (serverTasks: Task[], users: User[]) => {
    const names: String[] = [];

    serverTasks.map((task) => {
        users.map((user) => {
            if (user._id === task.userId) {
                names.push(user.username);
            };
        });
    });
    
    return removeDuplicates(names);
}