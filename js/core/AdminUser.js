class AdminUser extends User {
    #permissions = [];
    static MAX_PERMISSIONS;
    id;
    name;


    constructor(id, name)
    {
        super(id, name, 'admin');
        this.#permissions = new Set();
    }

    grantPermission(permission)
    {
        if (permission === 'admin') {
            console.warn("Попытка выдать права 'admin' обычным способом отклонена.");
            return false;
        }
        
        if (this.#permissions.length >= AdminUser.MAX_PERMISSIONS) {
            console.error("Достигнут лимит прав!");
            return false;
        }

        if (!this.#permissions.includes(permission)) {
            this.#permissions.push(permission);
            console.log(`[LOG]: Администратор ${this.name} выдал право: ${permission}`);
            return true;
        }
    }

    revokePermission(permission)
    {
        this.#permissions = this.#permissions.filter(p => p !== permission);
        console.log(`[LOG]: Администратор ${this.name} отозвал право: ${permission}`);
    }

    hasRole(role)
    {
        if (role === 'admin') 
            return true;
        // return this.#permissions.includes(role);
    }

    getPermissions()
    {
        return [...this.#permissions];
    }

    canManageUsers()
    {
        return this.#permissions.includes('manage_users');
    }

    banUser(userId, reason)
    {
        if (!this.canManageUsers()) {
            console.error("Недостаточно прав для блокировки пользователей!");
            return;
        }
        console.log(`[LOG]: Пользователь ${userId} заблокирован админом ${this.name}. Причина: ${reason}`);
    }
}