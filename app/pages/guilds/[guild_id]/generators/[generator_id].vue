<template>
  <div class="mb-64 flex flex-col gap-8">
    <DashboardSettingsSaveToast
      :open="generator_settings_edited"
      :loading="update_generator_pending"
      @save="
        update_generator({
          guild_id: guild_id!,
          generator_id: generator_id!,
          generator_settings: m_generator_settings!,
        })
      "
      @reset="m_generator_settings = useClone(generator_settings)"
    />

    <div class="flex items-center gap-4">
      <IconGenerator class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="guild_channels" class="dashboard-section-title">
          {{
            guild_channels.find((c) => c.id == generator_id)?.name ??
            $t('common.deleted_channel')
          }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description">{{
          $t('generators.editor.description')
        }}</span>
      </div>
      <div class="grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive :loading="delete_generator_loading">
            {{ $t('common.delete') }}
          </ButtonDestructive>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{{
              $t('generators.delete_confirm_title')
            }}</AlertDialogTitle>
            <AlertDialogDescription>
              {{ $t('generators.delete_confirm_description') }}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{{ $t('common.go_back') }}</AlertDialogCancel>
            <AlertDialogAction
              :destructive="true"
              :loading="delete_generator_loading"
              @click="
                delete_generator({
                  guild_id: guild_id!,
                  generator_id: generator_id!,
                })
              "
            >
              {{ $t('common.delete') }}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <div
      v-if="m_generator_settings && guild_channels && guild_roles"
      class="flex flex-col gap-12"
    >
      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_vc_name')
        }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('generators.editor.vc_name.title')"
            :description="$t('generators.editor.vc_name.description')"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  v-model="m_generator_settings.default_name"
                  type="text"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                  required
                />
                <DashboardVariablesButton
                  :is-ultimate="is_ultimate"
                  @upgrade="upgrade_dialog_open = true"
                  @variable-select="
                    (v) => (m_generator_settings!.default_name += v)
                  "
                />
              </div>
            </template>
          </GroupSetting>
          <GroupSetting
            :heading="$t('generators.editor.locked_name.title')"
            :description="$t('generators.editor.locked_name.description')"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  v-model="m_generator_settings.default_locked_name"
                  :placeholder="$t('common.not_set')"
                  type="text"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                />
                <DashboardVariablesButton
                  :is-ultimate="is_ultimate"
                  @upgrade="upgrade_dialog_open = true"
                  @variable-select="
                    (v) => (m_generator_settings!.default_locked_name += v)
                  "
                />
              </div>
            </template>
          </GroupSetting>
          <GroupSetting
            :heading="$t('generators.editor.hidden_name.title')"
            :description="$t('generators.editor.hidden_name.description')"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  v-model="m_generator_settings.default_hidden_name"
                  :placeholder="$t('common.not_set')"
                  type="text"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                />
                <DashboardVariablesButton
                  :is-ultimate="is_ultimate"
                  @upgrade="upgrade_dialog_open = true"
                  @variable-select="
                    (v) => (m_generator_settings!.default_hidden_name += v)
                  "
                />
              </div>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_rename')
        }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('generators.editor.state_change.title')"
            :description="$t('generators.editor.state_change.description')"
          >
            <Switch
              v-model:checked="
                m_generator_settings.rename_conditions.state_change
              "
            />
          </GroupSetting>
          <GroupSetting
            :heading="$t('generators.editor.owner_change.title')"
            :description="$t('generators.editor.owner_change.description')"
          >
            <Switch
              v-model:checked="
                m_generator_settings.rename_conditions.owner_change
              "
            />
          </GroupSetting>
          <GroupSetting
            :heading="$t('generators.editor.activity_change.title')"
            :description="$t('generators.editor.activity_change.description')"
            :ultimate="
              !is_ultimate &&
              !m_generator_settings.rename_conditions.activity_change
            "
            @upgrade="upgrade_dialog_open = true"
          >
            <Switch
              v-model:checked="
                m_generator_settings.rename_conditions.activity_change
              "
            />
          </GroupSetting>
          <GroupSetting
            :heading="$t('generators.editor.renaming.title')"
            :description="$t('generators.editor.renaming.description')"
          >
            <Switch
              v-model:checked="m_generator_settings.rename_conditions.renamed"
            />
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_vc_settings')
        }}</span>
        <div class="groups-container-compact flex-wrap">
          <GroupSetting
            :heading="$t('generators.editor.category.title')"
            :description="$t('generators.editor.category.description')"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="category_id"
                @update:model-value="
                  (category_id) =>
                    (m_generator_settings!.category =
                      category_id !== 'no_category' ? category_id : null)
                "
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{ category }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in guild_channels.filter(
                        (c) => c.type == 4,
                      )"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </SelectItem>
                    <!-- 'No category' option -->
                    <SelectItem value="no_category">{{
                      $t('common.no_category')
                    }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.position.title')"
            :description="$t('generators.editor.position.description')"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="m_generator_settings.initial_position"
                required
                @update:model-value="
                  (pos) =>
                    (m_generator_settings!.initial_position =
                      pos as GSGeneratorInitialPosition)
                "
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="pos in Object.values(GSGeneratorInitialPosition)"
                      :key="pos"
                      :value="pos"
                    >
                      {{
                        $t(`generators.editor.positions.${pos.toLowerCase()}`)
                      }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.user_limit.title')"
            :description="$t('generators.editor.user_limit.description')"
            compact
          >
            <template #bottom-action>
              <input
                :value="m_generator_settings.user_limit ?? ''"
                :placeholder="$t('common.not_set')"
                type="number"
                min="0"
                max="99"
                @input="
                  m_generator_settings.user_limit =
                    ($event.target as HTMLInputElement).value === ''
                      ? null
                      : Number(($event.target as HTMLInputElement).value)
                "
              />
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.bitrate.title')"
            :description="$t('generators.editor.bitrate.description')"
            compact
          >
            <template #bottom-action>
              <div class="vertical-center relative">
                <input
                  :value="
                    m_generator_settings.bitrate != null
                      ? m_generator_settings.bitrate / 1000
                      : ''
                  "
                  type="number"
                  min="0"
                  max="384"
                  class="grow"
                  :placeholder="$t('common.not_set')"
                  @input="
                    m_generator_settings.bitrate =
                      ($event.target as HTMLInputElement).value === ''
                        ? null
                        : Number(($event.target as HTMLInputElement).value) *
                          1000
                  "
                />
                <span
                  v-if="m_generator_settings.bitrate != null"
                  :class="
                    cn(
                      'absolute text-foreground-secondary transition-all duration-100',
                      m_generator_settings.bitrate! >= 100000
                        ? 'left-10'
                        : m_generator_settings.bitrate! >= 10000
                          ? 'left-8'
                          : 'left-6',
                    )
                  "
                  >{{ $t('common.kbps') }}</span
                >
              </div>
            </template>
          </GroupSetting>

          <GroupSetting :heading="$t('generators.editor.region.title')" compact>
            <template #description>
              <span class="text-foreground-secondary">
                {{ $t('generators.editor.region.description') }}
                <ButtonText
                  class="text-foreground-link-standout"
                  @click="
                    navigateTo(
                      'https://support.discord.com/hc/en-us/articles/1500007645701-Voice-Regions-on-Discord-FAQ#h_01F3RXJ4YCHYS652ETKWJ499Y3',
                      { open: { target: '_blank' } },
                    )
                  "
                >
                  {{ $t('common.see_guide') }}
                </ButtonText>
              </span>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_vc_permissions')
        }}</span>
        <div class="groups-container-compact flex-wrap">
          <GroupSetting
            :heading="$t('generators.editor.inheriting.title')"
            :description="$t('generators.editor.inheriting.description')"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="m_generator_settings.permissions_inherited"
                required
                @update:model-value="
                  (v) =>
                    (m_generator_settings!.permissions_inherited =
                      v as GSGeneratorPermissionsInherited)
                "
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in Object.values(
                        GSGeneratorPermissionsInherited,
                      )"
                      :key="v"
                      :value="v"
                    >
                      {{
                        $t(`generators.editor.inheritance.${v.toLowerCase()}`)
                      }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.default_state.title')"
            :description="$t('generators.editor.default_state.description')"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="m_generator_settings.initial_state"
                required
                @update:model-value="
                  (v) =>
                    (m_generator_settings!.initial_state =
                      v as GSGeneratorVCState)
                "
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in selectable_vc_states"
                      :key="v"
                      :value="v"
                    >
                      {{ $t(`generators.editor.states.${v.toLowerCase()}`) }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.target_role.title')"
            :description="$t('generators.editor.target_role.description')"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="target_role_id"
                @update:model-value="
                  (role_id) =>
                    (m_generator_settings!.permissions_target_role =
                      role_id !== 'no_role' ? role_id : null)
                "
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    target_role
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <DashboardRoleSelectItems
                      :roles="guild_roles!"
                      :guild_id="guild_id"
                    />
                    <!-- @everyone role option -->
                    <SelectItem value="no_role">@everyone</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.moderator_role.title')"
            :description="$t('generators.editor.moderator_role.description')"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="moderator_role_id"
                @update:model-value="
                  (role_id) =>
                    (m_generator_settings!.permissions_immune_role =
                      role_id !== 'no_role' ? role_id : null)
                "
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    moderator_role
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <DashboardRoleSelectItems
                      :roles="guild_roles!"
                      :guild_id="guild_id"
                    />
                    <!-- @everyone role option -->
                    <SelectItem value="no_role">{{
                      $t('generators.editor.no_role')
                    }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_commands')
        }}</span>
        <div class="groups-container-compact">
          <GroupSetting
            :heading="$t('generators.editor.min_user_limit.title')"
            :description="$t('generators.editor.min_user_limit.description')"
            compact
          >
            <template #bottom-action>
              <input
                :value="
                  m_generator_settings.commands_settings.min_user_limit ?? ''
                "
                :placeholder="$t('common.not_set')"
                type="number"
                min="0"
                :max="
                  m_generator_settings.commands_settings.max_user_limit ??
                  undefined
                "
                @input="
                  m_generator_settings.commands_settings.min_user_limit =
                    ($event.target as HTMLInputElement).value === ''
                      ? null
                      : Number(($event.target as HTMLInputElement).value)
                "
              />
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.max_user_limit.title')"
            :description="$t('generators.editor.max_user_limit.description')"
            compact
          >
            <template #bottom-action>
              <input
                :value="
                  m_generator_settings.commands_settings.max_user_limit ?? ''
                "
                :placeholder="$t('common.not_set')"
                type="number"
                :min="
                  m_generator_settings.commands_settings.min_user_limit ??
                  undefined
                "
                :max="99"
                @input="
                  m_generator_settings.commands_settings.max_user_limit =
                    ($event.target as HTMLInputElement).value === ''
                      ? null
                      : Number(($event.target as HTMLInputElement).value)
                "
              />
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.min_bitrate.title')"
            :description="$t('generators.editor.min_bitrate.description')"
            compact
          >
            <template #bottom-action>
              <div class="vertical-center relative">
                <input
                  :value="
                    m_generator_settings.commands_settings.min_bitrate != null
                      ? m_generator_settings.commands_settings.min_bitrate /
                        1000
                      : ''
                  "
                  type="number"
                  min="8"
                  :max="
                    m_generator_settings.commands_settings.max_bitrate != null
                      ? m_generator_settings.commands_settings.max_bitrate /
                        1000
                      : 384
                  "
                  class="grow"
                  :placeholder="$t('common.not_set')"
                  @input="
                    m_generator_settings.commands_settings.min_bitrate =
                      ($event.target as HTMLInputElement).value === ''
                        ? null
                        : Number(($event.target as HTMLInputElement).value) *
                          1000
                  "
                />
                <span
                  v-if="
                    m_generator_settings.commands_settings.min_bitrate != null
                  "
                  :class="
                    cn(
                      'absolute text-foreground-secondary transition-all duration-100',
                      m_generator_settings.commands_settings.min_bitrate! >=
                        100000
                        ? 'left-10'
                        : m_generator_settings.commands_settings.min_bitrate! >=
                            10000
                          ? 'left-8'
                          : 'left-6',
                    )
                  "
                  >{{ $t('common.kbps') }}</span
                >
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.max_bitrate.title')"
            :description="$t('generators.editor.max_bitrate.description')"
            compact
          >
            <template #bottom-action>
              <div class="vertical-center relative">
                <input
                  :value="
                    m_generator_settings.commands_settings.max_bitrate != null
                      ? m_generator_settings.commands_settings.max_bitrate /
                        1000
                      : ''
                  "
                  type="number"
                  :min="
                    m_generator_settings.commands_settings.min_bitrate != null
                      ? m_generator_settings.commands_settings.min_bitrate /
                        1000
                      : 8
                  "
                  max="384"
                  class="grow"
                  :placeholder="$t('common.not_set')"
                  @input="
                    m_generator_settings.commands_settings.max_bitrate =
                      ($event.target as HTMLInputElement).value === ''
                        ? null
                        : Number(($event.target as HTMLInputElement).value) *
                          1000
                  "
                />
                <span
                  v-if="
                    m_generator_settings.commands_settings.max_bitrate != null
                  "
                  :class="
                    cn(
                      'absolute text-foreground-secondary transition-all duration-100',
                      m_generator_settings.commands_settings.max_bitrate! >=
                        100000
                        ? 'left-10'
                        : m_generator_settings.commands_settings.max_bitrate! >=
                            10000
                          ? 'left-8'
                          : 'left-6',
                    )
                  "
                  >{{ $t('common.kbps') }}</span
                >
              </div>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_utilities')
        }}</span>
        <div class="groups-container-compact">
          <GroupSetting
            :heading="$t('generators.editor.owner_permissions.title')"
            :description="$t('generators.editor.owner_permissions.description')"
            compact
          >
            <template #bottom-action>
              <DropdownMenu>
                <DropdownMenuTrigger
                  class="focus-visible:border-opacity-80 h-9 w-full rounded bordered bg-background px-2.5 py-1 focus-visible:border-pink-500"
                >
                  {{
                    $t('generators.editor.selected_permissions', {
                      count: owner_permissions?.length ?? 0,
                    })
                  }}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <template
                    v-for="category in permissionCategories"
                    :key="category"
                  >
                    <DropdownMenuLabel>{{
                      $t(`generators.editor.permission_categories.${category}`)
                    }}</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      v-for="permission in (discord_permissions ?? []).filter(
                        (p) => p.category.toLowerCase() == category,
                      )"
                      :key="permission.id"
                      :on-select="(event) => event.preventDefault()"
                      :checked="
                        owner_permissions != undefined &&
                        owner_permissions.some((p) => p == permission.id)
                      "
                      @update:checked="
                        () => {
                          const was_checked =
                            owner_permissions != undefined &&
                            owner_permissions.some((p) => p == permission.id)

                          if (was_checked) {
                            owner_permissions = owner_permissions!.filter(
                              (p) => p != permission.id,
                            )
                          } else {
                            if (owner_permissions == null) {
                              owner_permissions = []
                            }

                            owner_permissions.push(permission.id)
                          }
                        }
                      "
                    >
                      {{ permission.name }}
                    </DropdownMenuCheckboxItem>
                  </template>
                </DropdownMenuContent>
              </DropdownMenu>
            </template>
          </GroupSetting>
          <GroupSetting
            :heading="$t('generators.editor.owner_role.title')"
            :description="$t('generators.editor.owner_role.description')"
            class="relative"
            :ultimate="!is_ultimate"
            compact
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <Select
                v-model:model-value="owner_role_id"
                :disabled="!is_ultimate"
                @update:model-value="
                  (role_id) =>
                    (m_generator_settings!.owner_role =
                      role_id !== 'no_role' ? role_id : null)
                "
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{ owner_role }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <DashboardRoleSelectItems
                      :roles="guild_roles!"
                      :guild_id="guild_id"
                    />
                    <!-- no role option -->
                    <SelectItem value="no_role">{{
                      $t('generators.editor.no_role')
                    }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.queue_mode.title')"
            :description="$t('generators.editor.queue_mode.description')"
            compact
          >
            <template #bottom-action>
              <Switch v-model:checked="m_generator_settings.queue_mode" />
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.fallback.title')"
            :description="$t('generators.editor.fallback.description')"
            :ultimate="!is_ultimate"
            compact
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <Select
                v-model:model-value="fallback_generator_id"
                :disabled="!is_ultimate"
                @update:model-value="
                  (id) =>
                    (m_generator_settings!.fallback_id =
                      id !== 'no_fallback' ? id : null)
                "
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    fallback_generator
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="generator in guild_channels.filter((c) =>
                        guild_settings?.generators.some((g) => g.id == c.id),
                      )"
                      :key="generator.id"
                      :value="generator.id"
                    >
                      {{ generator.name }}
                    </SelectItem>
                    <!-- 'No category' option -->
                    <SelectItem value="no_fallback">{{
                      $t('generators.editor.no_fallback')
                    }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_waiting')
        }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('generators.editor.waiting_auto.title')"
            :description="$t('generators.editor.waiting_auto.description')"
            :ultimate="!is_ultimate && !m_generator_settings.auto_waiting"
            @upgrade="upgrade_dialog_open = true"
          >
            <Switch
              v-model:checked="m_generator_settings.auto_waiting"
              :disabled="!is_ultimate && !m_generator_settings.auto_waiting"
            />
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.waiting_name.title')"
            :description="$t('generators.editor.waiting_name.description')"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  v-model="m_generator_settings.default_waiting_name"
                  type="text"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                  required
                />
                <DashboardVariablesButton
                  :is-ultimate="is_ultimate"
                  @upgrade="upgrade_dialog_open = true"
                  @variable-select="
                    (v) => (m_generator_settings!.default_waiting_name += v)
                  "
                />
              </div>
            </template>
          </GroupSetting>

          <div class="groups-container-compact">
            <GroupSetting
              :heading="$t('generators.editor.waiting_category.title')"
              :description="
                $t('generators.editor.waiting_category.description')
              "
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="waiting_category_id"
                  @update:model-value="
                    (category_id) =>
                      (m_generator_settings!.waiting_category =
                        category_id !== 'no_category' ? category_id : null)
                  "
                >
                  <SelectTrigger>
                    <SelectValue aria-label="value">{{
                      waiting_category
                    }}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="category in guild_channels.filter(
                          (c) => c.type == 4,
                        )"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </SelectItem>
                      <!-- 'No category' option -->
                      <SelectItem value="no_category">{{
                        $t('common.no_category')
                      }}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('generators.editor.waiting_position.title')"
              :description="
                $t('generators.editor.waiting_position.description')
              "
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="m_generator_settings.waiting_position"
                  required
                  @update:model-value="
                    (pos) =>
                      (m_generator_settings!.waiting_position =
                        pos as GSGeneratorInitialPosition)
                  "
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="pos in Object.values(GSGeneratorInitialPosition)"
                        :key="pos"
                        :value="pos"
                      >
                        {{
                          $t(`generators.editor.positions.${pos.toLowerCase()}`)
                        }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('generators.editor.waiting_user_limit.title')"
              :description="
                $t('generators.editor.waiting_user_limit.description')
              "
              compact
            >
              <template #bottom-action>
                <input
                  :value="m_generator_settings.waiting_user_limit ?? ''"
                  :placeholder="$t('common.not_set')"
                  type="number"
                  min="0"
                  max="99"
                  @input="
                    m_generator_settings.waiting_user_limit =
                      ($event.target as HTMLInputElement).value === ''
                        ? null
                        : Number(($event.target as HTMLInputElement).value)
                  "
                />
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('generators.editor.waiting_bitrate.title')"
              :description="$t('generators.editor.waiting_bitrate.description')"
              compact
            >
              <template #bottom-action>
                <div class="vertical-center relative">
                  <input
                    :value="
                      m_generator_settings.waiting_bitrate != null
                        ? m_generator_settings.waiting_bitrate / 1000
                        : ''
                    "
                    type="number"
                    min="0"
                    max="384"
                    class="grow"
                    :placeholder="$t('common.not_set')"
                    @input="
                      m_generator_settings.waiting_bitrate =
                        ($event.target as HTMLInputElement).value === ''
                          ? null
                          : Number(($event.target as HTMLInputElement).value) *
                            1000
                    "
                  />
                  <span
                    v-if="m_generator_settings.waiting_bitrate != null"
                    :class="
                      cn(
                        'absolute text-foreground-secondary transition-all duration-100',
                        m_generator_settings.waiting_bitrate! >= 100000
                          ? 'left-10'
                          : m_generator_settings.waiting_bitrate! >= 10000
                            ? 'left-8'
                            : 'left-6',
                      )
                    "
                    >{{ $t('common.kbps') }}</span
                  >
                </div>
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('generators.editor.waiting_inheriting.title')"
              :description="
                $t('generators.editor.waiting_inheriting.description')
              "
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="
                    m_generator_settings.waiting_permissions_inherited
                  "
                  required
                  @update:model-value="
                    (v) =>
                      (m_generator_settings!.waiting_permissions_inherited =
                        v as GSGeneratorPermissionsInherited)
                  "
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="v in Object.values(
                          GSGeneratorPermissionsInherited,
                        )"
                        :key="v"
                        :value="v"
                      >
                        {{
                          $t(`generators.editor.inheritance.${v.toLowerCase()}`)
                        }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>
          </div>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">{{
          $t('generators.editor.group_chat')
        }}</span>
        <div class="groups-container">
          <GroupSetting
            :heading="$t('generators.editor.chat_auto.title')"
            :description="$t('generators.editor.chat_auto.description')"
            :ultimate="!is_ultimate && !m_generator_settings.auto_chat"
            @upgrade="upgrade_dialog_open = true"
          >
            <Switch
              v-model:checked="m_generator_settings.auto_chat"
              :disabled="!is_ultimate && !m_generator_settings.auto_chat"
            />
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.chat_name.title')"
            :description="$t('generators.editor.chat_name.description')"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  v-model="m_generator_settings.default_chat_name"
                  type="text"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                  required
                />
                <DashboardVariablesButton
                  :is-ultimate="is_ultimate"
                  :disabled-categories="[VariableCategory.INCREMENTAL_VALUES]"
                  @upgrade="upgrade_dialog_open = true"
                  @variable-select="
                    (v) => (m_generator_settings!.default_chat_name += v)
                  "
                />
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.chat_topic.title')"
            :description="$t('generators.editor.chat_topic.description')"
          >
            <template #bottom-action>
              <input
                v-model="m_generator_settings.chat_topic"
                :placeholder="$t('common.not_set')"
                type="text"
                minlength="0"
                maxlength="1024"
              />
            </template>
          </GroupSetting>

          <GroupSetting
            :heading="$t('generators.editor.chat_message_type.title')"
            :description="$t('generators.editor.chat_message_type.description')"
            :ultimate="
              !is_ultimate &&
              m_generator_settings.default_chat_text == null &&
              m_generator_settings.chat_interface == -1
            "
            @upgrade="upgrade_dialog_open = true"
          >
            <Select
              v-model:model-value="private_chat_message_type"
              required
              @update:model-value="
                (v) => (private_chat_message_type = v as PrivateChatMessageType)
              "
            >
              <SelectTrigger class="w32 md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="v in Object.values(PrivateChatMessageType)"
                    :key="v"
                    :value="v"
                  >
                    {{ $t(`generators.editor.chat_message_types.${v}`) }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </GroupSetting>

          <GroupSetting
            v-if="
              private_chat_message_type ==
                PrivateChatMessageType.TEXT_MESSAGE ||
              private_chat_message_type == PrivateChatMessageType.EMBED
            "
            :heading="$t('generators.editor.chat_message.title')"
            :description="$t('generators.editor.chat_message.description')"
          >
            <template #bottom-action>
              <div class="flex items-start gap-2">
                <textarea
                  v-model="m_generator_settings.default_chat_text"
                  class="min-h-20 grow resize-y"
                  minlength="0"
                  :maxlength="
                    private_chat_message_type ==
                    PrivateChatMessageType.TEXT_MESSAGE
                      ? 2048
                      : 4096
                  "
                  required
                />
                <DashboardVariablesButton
                  :is-ultimate="is_ultimate"
                  @upgrade="upgrade_dialog_open = true"
                  @variable-select="
                    (v) => (m_generator_settings!.default_chat_name += v)
                  "
                />
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            v-if="private_chat_message_type == PrivateChatMessageType.INTERFACE"
            :heading="$t('generators.editor.chat_interface.title')"
            :description="$t('generators.editor.chat_interface.description')"
          >
            <template #bottom-action>
              <Select
                :model-value="
                  m_generator_settings.chat_interface as unknown as string
                "
                required
                @update:model-value="
                  (i) =>
                    (m_generator_settings!.chat_interface =
                      i as unknown as number)
                "
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    $t('generators.editor.interface_in', {
                      channel: chat_interface,
                    })
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="(v, index) in guild_settings!.interfaces"
                      :key="v.message_id"
                      :value="index as unknown as string"
                      class=""
                    >
                      <div class="flex flex-col">
                        <span>{{
                          $t('generators.editor.interface_in', {
                            channel: guild_channels.find(
                              (c) => c.id == v.channel_id,
                            )?.name,
                          })
                        }}</span>
                        <span class="text-foreground-secondary">{{
                          $t('generators.editor.message_id', {
                            id: v.message_id,
                          })
                        }}</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <div class="groups-container-compact">
            <GroupSetting
              :heading="$t('generators.editor.chat_category.title')"
              :description="$t('generators.editor.chat_category.description')"
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="private_chat_category_id"
                  @update:model-value="
                    (id) =>
                      (m_generator_settings!.chat_category =
                        id !== 'no_category' ? id : null)
                  "
                >
                  <SelectTrigger>
                    <SelectValue aria-label="value">{{
                      private_chat_category
                    }}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="category in guild_channels.filter(
                          (c) => c.type == 4,
                        )"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </SelectItem>
                      <!-- 'No category' option -->
                      <SelectItem value="no_category">{{
                        $t('common.no_category')
                      }}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('generators.editor.chat_inheriting.title')"
              :description="$t('generators.editor.chat_inheriting.description')"
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="
                    m_generator_settings.chat_permissions_inherited
                  "
                  required
                  @update:model-value="
                    (v) =>
                      (m_generator_settings!.chat_permissions_inherited =
                        v as GSGeneratorPermissionsInherited)
                  "
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="v in Object.values(
                          GSGeneratorPermissionsInherited,
                        )"
                        :key="v"
                        :value="v"
                      >
                        {{
                          $t(`generators.editor.inheritance.${v.toLowerCase()}`)
                        }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('generators.editor.chat_nsfw.title')"
              :description="$t('generators.editor.chat_nsfw.description')"
              compact
            >
              <template #bottom-action>
                <Switch v-model:checked="m_generator_settings.chat_nsfw" />
              </template>
            </GroupSetting>

            <GroupSetting
              :heading="$t('generators.editor.chat_slowmode.title')"
              :description="$t('generators.editor.chat_slowmode.description')"
              compact
            >
              <template #bottom-action>
                <input
                  :value="m_generator_settings.chat_slowmode ?? ''"
                  :placeholder="$t('common.not_set')"
                  type="number"
                  min="0"
                  max="21600"
                  @input="
                    m_generator_settings.chat_slowmode =
                      ($event.target as HTMLInputElement).value === ''
                        ? null
                        : Number(($event.target as HTMLInputElement).value)
                  "
                />
              </template>
            </GroupSetting>
            <!-- message (embed, normal, interface) -->
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="guild_settings_error"
      class="center text-foreground-destructive"
    >
      {{ $t('common.error_generic') }}
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>

    <DashboardUpgradeDialog
      v-model:open="upgrade_dialog_open"
      @on-upgrade="
        (sub_id) => {
          upgrade_dialog_open = false
          upgrade_guild({ guild_id: guild_id!, subscription_id: sub_id })
        }
      "
      @on-purchase-on-website="
        () =>
          navigateTo('/ultimate', {
            external: true,
            open: { target: '_blank' },
          })
      "
      @on-purchase-on-discord="
        () =>
          navigateTo('/discord-ultimate', {
            external: true,
            open: { target: '_blank' },
          })
      "
    />
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#imports'
import useClone from '~/composables/useClone'
import cn from '~/utils/cn'
import isGuildUltimate from '~/utils/isGuildUltimate'
// enums are used as values in the template
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  GSGeneratorInitialPosition,
  GSGeneratorPermissionsInherited,
  GSGeneratorVCState,
  type GSGenerator,
} from '~/types/guild-settings/generator'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import useUpdateGeneratorMutation from '~/data/astro/mutations/useUpdateGeneratorMutation'
import { deepEqual } from 'fast-equals'
import { Select, SelectItem } from '~/components/ui/select'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.generator.title') }),
  meta: [
    { name: 'description', content: t('meta.generator.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.generator.title') }),
    },
    { property: 'og:description', content: t('meta.generator.description') },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/generator' },
  ],
}))

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const generator_id = ref(route.params.generator_id as string | undefined)

watch(
  () => route.params,
  (params) => {
    generator_id.value = params.generator_id as string | undefined
  },
)

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)
const { data: discord_permissions } = useDiscordPermissions()

const permissionCategories = ['general', 'apps', 'membership', 'text', 'voice']

const upgrade_dialog_open = ref(false)
const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const generator_settings = ref<GSGenerator | undefined>(undefined)
watch(
  guild_settings,
  (new_guild_settings) => {
    generator_settings.value = new_guild_settings?.generators?.find(
      (c) => c.id == generator_id.value,
    )
  },
  { deep: true, immediate: true },
)

const m_generator_settings = ref<GSGenerator | undefined>(undefined)
const generator_settings_edited = ref(false)

watch(
  generator_settings,
  (new_generator_settings) => {
    if (new_generator_settings) {
      m_generator_settings.value = useClone(new_generator_settings)
    }
  },
  { deep: true, immediate: true },
)

watch(
  m_generator_settings,
  (new_m_generator_settings) => {
    if (!generator_settings.value || !new_m_generator_settings) {
      generator_settings_edited.value = false
    } else {
      generator_settings_edited.value = !deepEqual(
        new_m_generator_settings,
        generator_settings.value,
      )
    }
  },
  { deep: true, immediate: true },
)

/// COMPUTED SETTINGS ///
const selectable_vc_states = Object.values(GSGeneratorVCState).filter(
  (v) => v !== GSGeneratorVCState.UNHIDDEN,
)

const category_id = computed({
  get() {
    return m_generator_settings.value?.category ?? 'no_category'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.category =
        value !== 'no_category' ? value : null
    }
  },
})
const category = computed(() => {
  return (
    guild_channels.value?.find((c) => c.id === category_id.value)?.name ??
    t('common.no_category')
  )
})

const target_role_id = computed({
  get() {
    return m_generator_settings.value?.permissions_target_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.permissions_target_role =
        value !== 'no_role' ? value : null
    }
  },
})
const target_role = computed(() => {
  return (
    guild_roles.value?.find((r) => r.id === target_role_id.value)?.name ??
    '@everyone'
  )
})

const moderator_role_id = computed({
  get() {
    return m_generator_settings.value?.permissions_immune_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.permissions_immune_role =
        value !== 'no_role' ? value : null
    }
  },
})
const moderator_role = computed(() => {
  return (
    guild_roles.value?.find((r) => r.id === moderator_role_id.value)?.name ??
    t('common.not_set')
  )
})

const owner_permissions = computed({
  get() {
    return m_generator_settings.value?.owner_permission_ids
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.owner_permission_ids = value ?? []
    }
  },
})
const owner_role_id = computed({
  get() {
    return m_generator_settings.value?.owner_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.owner_role = value !== 'no_role' ? value : null
    }
  },
})
const owner_role = computed(() => {
  return (
    guild_roles.value?.find((r) => r.id === owner_role_id.value)?.name ??
    t('common.not_set')
  )
})

const fallback_generator_id = computed({
  get() {
    return m_generator_settings.value?.fallback_id ?? 'no_fallback'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.fallback_id =
        value !== 'no_fallback' ? value : null
    }
  },
})
const fallback_generator = computed(() => {
  return (
    guild_channels.value?.find((c) => c.id === fallback_generator_id.value)
      ?.name ?? t('generators.editor.no_fallback')
  )
})

const waiting_category_id = computed({
  get() {
    return m_generator_settings.value?.waiting_category ?? 'no_category'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.waiting_category =
        value !== 'no_category' ? value : null
    }
  },
})
const waiting_category = computed(() => {
  return (
    guild_channels.value?.find((c) => c.id === waiting_category_id.value)
      ?.name ?? t('common.no_category')
  )
})

const private_chat_category_id = computed({
  get() {
    return m_generator_settings.value?.chat_category ?? 'no_category'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.chat_category =
        value !== 'no_category' ? value : null
    }
  },
})
const private_chat_category = computed(() => {
  return (
    guild_channels.value?.find((c) => c.id === private_chat_category_id.value)
      ?.name ?? t('common.no_category')
  )
})

const chat_interface = computed(() => {
  if (
    m_generator_settings.value &&
    guild_settings.value &&
    guild_channels.value
  ) {
    const astro_interface =
      m_generator_settings.value.chat_interface != -1
        ? guild_settings.value.interfaces[
            m_generator_settings.value.chat_interface!
          ]
        : null
    if (astro_interface == null) {
      return t('generators.editor.no_interface')
    } else {
      return (
        guild_channels.value?.find((c) => c.id == astro_interface.channel_id)
          ?.name ?? t('generators.editor.no_interface')
      )
    }
  } else {
    return t('generators.editor.no_interface')
  }
})

enum PrivateChatMessageType {
  NO_MESSAGE = 'no_message',
  TEXT_MESSAGE = 'text_message',
  EMBED = 'embed',
  INTERFACE = 'interface',
}

const private_chat_message_type = computed({
  get() {
    if (m_generator_settings.value) {
      if (m_generator_settings.value.chat_interface != -1) {
        return PrivateChatMessageType.INTERFACE
      } else if (m_generator_settings.value.default_chat_text !== null) {
        if (m_generator_settings.value.default_chat_text_embed)
          return PrivateChatMessageType.EMBED
        else return PrivateChatMessageType.TEXT_MESSAGE
      } else {
        return PrivateChatMessageType.NO_MESSAGE
      }
    } else {
      return PrivateChatMessageType.NO_MESSAGE
    }
  },
  set(value) {
    switch (value) {
      case PrivateChatMessageType.NO_MESSAGE: {
        if (m_generator_settings.value) {
          m_generator_settings.value.chat_interface = -1
          m_generator_settings.value.default_chat_text = null
        }
        break
      }
      case PrivateChatMessageType.TEXT_MESSAGE: {
        if (m_generator_settings.value) {
          m_generator_settings.value.chat_interface = -1
          if (m_generator_settings.value.default_chat_text == null) {
            m_generator_settings.value.default_chat_text =
              'This is your private text chat!'
          }
          m_generator_settings.value.default_chat_text_embed = false
        }
        break
      }
      case PrivateChatMessageType.EMBED: {
        if (m_generator_settings.value) {
          m_generator_settings.value.chat_interface = -1
          if (m_generator_settings.value.default_chat_text == null) {
            m_generator_settings.value.default_chat_text =
              'This is your private text chat'
          }
          m_generator_settings.value.default_chat_text_embed = true
        }
        break
      }
      case PrivateChatMessageType.INTERFACE: {
        if (m_generator_settings.value && guild_settings.value) {
          if (guild_settings.value.interfaces.length > 0) {
            if (m_generator_settings.value.chat_interface == -1)
              m_generator_settings.value.chat_interface = 0

            m_generator_settings.value.default_chat_text = null
          } else {
            toast({
              description: t('generators.editor.need_interface'),
              variant: 'destructive',
            })
          }
        }
        break
      }
      default:
        break
    }
  },
})

/// MUTATIONS ///
const {
  mutate: delete_generator,
  isPending: delete_generator_loading,
  error: delete_generator_error,
  isSuccess: delete_generator_success,
} = useDeleteGeneratorMutation()
const {
  mutate: update_generator,
  isPending: update_generator_pending,
  error: update_generator_error,
} = useUpdateGeneratorMutation()
const { mutate: upgrade_guild, error: upgrade_guild_error } =
  useGuildUpgradeMutation()

/// SUCCESS ACTIONS ///
watch(upgrade_guild_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(guild_settings_error, (e) => {
  if (
    e instanceof AError &&
    e.code === AErrorCode.BOT_NOT_IN_GUILD &&
    guild_id.value
  ) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(delete_generator_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/generators`)
  }
})

/// ERROR TOASTS ///
watch(delete_generator_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(update_generator_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
