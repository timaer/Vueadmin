import { constRoutes as dynamicRoutes } from "@/router";
export function getActiveRoute(activename,routes){
            let myRoutePath=[]
            stop:
            for(let i=0;i<routes.length;i++){
                if(routes[i].name==activename) {
                    myRoutePath.push(routes[i].title)
                    break;
                }
                if(routes[i].hasChildren){
                     for(let j=0;j<routes[i].children.length;j++){
                         if(routes[i].children[j].name==activename){
                            myRoutePath.push(routes[i].title) 
                            myRoutePath.push(routes[i].children[j].title)
                            break stop;
                         }
                     }
                }
            }
            return myRoutePath
}

export function getAccessRoutes(powerlist){
    let countRoutes=[]
    for(let i=0;i<dynamicRoutes.length;i++){
        if(powerlist.includes(dynamicRoutes[i].name) && !dynamicRoutes[i].hasChildren){
            countRoutes.push(dynamicRoutes[i])
            continue
        }
        if(dynamicRoutes[i].hasChildren){
            let childrenlist=[]
            let thisroute={  //js中完全复制复杂对象比较难，暂时没有想到更好的解决
                path: dynamicRoutes[i].path,
                name: dynamicRoutes[i].name,
                title:dynamicRoutes[i].title,
                icon:dynamicRoutes[i].icon,
                hasChildren:dynamicRoutes[i].hasChildren,
                component: dynamicRoutes[i].component
            }
            for(let j=0;j<dynamicRoutes[i].children.length;j++){
                if(powerlist.includes(dynamicRoutes[i].children[j].name)) {
                    childrenlist.push(dynamicRoutes[i].children[j])
                }
            }
            if(childrenlist.length>0){
                thisroute["children"]=childrenlist
                countRoutes.push(thisroute)
            }
        }
    }
    return countRoutes
}