class AdminUser extends User {
    #permissions = new Set();
    static MAX_PERMISSIONS = 5;


    constructor(id, name)
    {
        super(id, name, 'admin');
    }

    grantPermission(permission)
    {
        if (permission === 'admin') {
            console.warn("Попытка выдать права 'admin' обычным способом отклонена.");
            return false;
        }
        
        if (this.#permissions.size >= AdminUser.MAX_PERMISSIONS) {
            console.error("Достигнут лимит прав!");
            return false;
        }

        if (!this.#permissions.has(permission)) {
            this.#permissions.add(permission);
            console.log(`[LOG]: Администратор ${this.name} выдал право: ${permission}`);
            return true;
        }
    }

    revokePermission(permission)
    {
        if (this.#permissions.delete(permission)) {
            console.log(`[LOG]: Администратор ${this.name} отозвал право: ${permission}`);
        }
    }

    hasRole(role)
    {
        if (role === 'admin') {
            return true;
        }
        else {
            return this.#permissions.has(role);
        }
    }

    getPermissions()
    {
        return Array.from(this.#permissions);
    }

    canManageUsers()
    {
        return this.#permissions.has('manage_users');
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