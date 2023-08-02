import { Popover, Spacer, User, Button, Row, Text, Grid, Input } from "@nextui-org/react";

export default function MothlyExpenses({ profile, deleteEvent, updatedIncome, user }) {
  const costs = profile.filter(item => item.expense === true)


  console.log(profile)
  return (


    <section className="bg-gradient-to-b from-[#051A9A] pb-2 to-blue-700 w-5/6 text-[#96A6FF] overflow-y-scroll min-h-[10%] max-h-[85%] rounded-xl text-xl">
      <div className="flex flex-wrap flex-row pt-4 pl-3">
        <h2 className=" font-semibold underline pr-2 w-fit">Income: </h2>
        <p>{!user?.monthlyIncome
          ? <p className="w-fit">No estimated income listed</p>
          : <p>${parseFloat(user.monthlyIncome).toLocaleString()}</p>
        } </p>

        <div className="w-fit mr-[12%] mt-4 ml-auto">
          <Popover placement="left">
            <Popover.Trigger>
              <Button color="warning" size="xs" auto ghost >Update</Button>
            </Popover.Trigger>

            {/* content of the pop up*/}
            <Popover.Content className="px-4 py-1" >
              <form onSubmit={updatedIncome}>
                <Input labelLeft="Updated Income" className="mx-auto px-2 py-1 rounded-xl my-4" type="text" name="updated_income" />
                  <Button type="sumbit" className="mx-auto mb-2" size="sm" shadow color="error">
                    Update
                  </Button>
              </form>

            </Popover.Content>
          </Popover>
        </div>

      </div>
      <Spacer
      />
      <h2 className="pl-3 font-semibold underline ">Expenses</h2>
      {costs?.map((item) => (
        <div key={item.id} className=" w-11/12  pl-2 border-slate-500 border-b-[1px] py-1 mx-auto my-4">
          <div className="flex flex-wrap mx-auto flex-row">
            <p className=" text-lg border-slate-500 border-r-[2px]  w-[40%]">{item.title}</p>
            <p className=" pl-2 text-lg  w-[40%]">${parseFloat(item.amount).toLocaleString()}</p>
            <div>


              <Popover>
                <Popover.Trigger>
                  <Button color="error" size="xs" auto flat >Delete</Button>
                </Popover.Trigger>

                {/* content of the pop up*/}
                <Popover.Content>
                  <div className="p-2">
                    <Grid.Container
                      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "350px" }}
                    >
                      <Row justify="center" align="center">
                        <Text b >Confirm</Text>
                      </Row>

                      <Row>
                        <Text className="pb-4">
                          Are you sure you want to delete this item?
                        </Text>
                      </Row>
                      <Grid.Container alignContent="center">
                        <Grid>
                        </Grid>
                        <Grid>
                          <Button onClick={e => deleteEvent(item.id, item.uid)} size="sm" shadow color="error">
                            Delete
                          </Button>
                        </Grid>
                      </Grid.Container>

                    </Grid.Container>
                  </div>
                </Popover.Content>
              </Popover>




            </div>
          </div>
        </div>
      ))}
    </section>
  )
}